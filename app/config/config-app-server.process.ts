"use server";
import { createClient } from "@supabase/supabase-js";
import {
  emailDemoConfig,
  serverConfig,
  serverDemoConfig,
} from "./config-app-environment";
import { EmailConfig, ServerConfig } from "./config-app-environment-interface";

export async function isAppServerStatusOk(): Promise<boolean> {
  const envStatus = {
    isOK: await getServerEnvironmentInfoOK(serverConfig),
    isDemo: await isDemoEnv(serverConfig),
    isServerConfigOk: await isServerConfigOk(serverConfig),
  };

  if (!envStatus.isOK || !envStatus.isServerConfigOk) {
    return false;
  }

  if (envStatus.isDemo) {
    return true;
  }

  return true;
}

async function getServerEnvironmentInfoOK(
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

async function isDemoEnv(serverConfig: ServerConfig): Promise<boolean> {
  const isDemoEnv =
    JSON.stringify(serverConfig) === JSON.stringify(serverDemoConfig);
  isDemoEnv
    ? console.log({
      environmentDescription: "App is using demo environment config"
    })
    : console.log({
      environmentDescription: "App is using live environment config"
    });
  return isDemoEnv;
}

async function isServerConfigOk(config: ServerConfig): Promise<boolean> {
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
