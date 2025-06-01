"use server";
import { createClient } from "@supabase/supabase-js";
import {
  emailConfig,
  emailDemoConfig,
  serverConfig,
  serverDemoConfig,
} from "./config-app-environment";
import { EmailConfig, ServerConfig } from "./config-app-environment-interface";

export async function isAppServerStatusOk(): Promise<boolean> {
  const envStatus = {
    isServerDatabaseEnvironmentOK: await isServerDatabaseEnvironmentOK(serverConfig),
    isDemo: await isServerEnvironmentDemo(serverConfig, emailConfig),
    isServerDatabaseConfigOk: await isServerDatabaseConfigOk(serverConfig),
    isProductionEnvKeysValid: await isProductionEnvKeysValid(serverConfig, emailConfig),
  };

  if (
    !envStatus.isServerDatabaseEnvironmentOK ||
    !envStatus.isServerDatabaseConfigOk
  ) {
    return false;
  }

  if (envStatus.isDemo) return true;

  if (!envStatus.isProductionEnvKeysValid) return false;

  return true;
}


async function isServerDatabaseEnvironmentOK(
  serverConfig: ServerConfig
): Promise<boolean> {
  const supabase = createClient(
    serverConfig.supabaseKey,
    serverConfig.supabaseAnonKey
  );

  try {
    const { data, error } = await supabase.functions.invoke("environment-info");

    if (error) throw error;
    console.log(data);
    return true;
  } catch (error) {
    console.log({
      status: "offline",
      message: "Could not verify environment",
      isFallback: true,
    });
    return false;
  }
}

async function isServerEnvironmentDemo(
  serverConfig: ServerConfig,
  emailConfig: EmailConfig
): Promise<boolean> {
  const isDemoEnv =
    JSON.stringify(serverConfig) === JSON.stringify(serverDemoConfig);

  const isDemoEmailConfig =
    JSON.stringify(emailConfig.brideEmailList) ===
      JSON.stringify(emailDemoConfig.brideEmailList) &&
    JSON.stringify(emailConfig.organizerEmailList) ===
      JSON.stringify(emailDemoConfig.organizerEmailList);

  const isDemo = isDemoEnv && isDemoEmailConfig;

  console.log({
    environmentDescription: isDemo
      ? "App is using demo environment config"
      : "App is using live environment config",
  });

  return isDemo;
}

async function isServerDatabaseConfigOk(
  config: ServerConfig
): Promise<boolean> {
  try {
    const supabase = createClient(config.supabaseKey, config.supabaseAnonKey);

    const { data, error } = await supabase
      .from(config.rsvpTableName)
      .select("*")
      .limit(1);

    if (error) {
      console.error({
        serverDbConfigStatus: "Error",
        serverDbConfigMessage: `❌ Supabase config validation failed:${error.message}`,
      });
      return false;
    }

    console.log({
      serverDbConfigStatus: "Success",
      serverDbConfigMessage: "server config config validation success",
    });

    return true;
  } catch (error: any) {
    console.error({
      serverDbConfigStatus: "Error",
      serverDbConfigMessage: `❌ Supabase config validation failed:${error.message}`,
    });
    return false;
  }
}

export async function isProductionEnvKeysValid(
  serverConfig: ServerConfig,
  emailConfig: EmailConfig
): Promise<boolean> {
  const invalidProductionKeys: {
    configType: string;
    key: string;
    value: any;
  }[] = [];

  Object.keys(serverConfig).forEach((key) => {
    const k = key as keyof ServerConfig;
    if (
      JSON.stringify(serverConfig[k]) === JSON.stringify(serverDemoConfig[k])
    ) {
      invalidProductionKeys.push({
        configType: "serverConfig",
        key: k,
        value: serverConfig[k],
      });
    }
  });

  // Check email config
  Object.keys(emailConfig).forEach((key) => {
    const k = key as keyof EmailConfig;
    if (JSON.stringify(emailConfig[k]) === JSON.stringify(emailDemoConfig[k])) {
      invalidProductionKeys.push({
        configType: "emailConfig",
        key: k,
        value: emailConfig[k],
      });
    }
  });

  if (invalidProductionKeys.length > 0) {
    console.error(
      "❌ Some production config values are using fallback/demo defaults:"
    );
    invalidProductionKeys.forEach((item) => {
      console.error(`[${item.configType}] ${item.key}:`, item.value);
    });
    return false;
  }

  console.log("✅ All production environment config values appear valid.");
  return true;
}
