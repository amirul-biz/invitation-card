import { createClient } from "@supabase/supabase-js";
import { emailDemoConfig } from "./config-app-environment";
import { EmailConfig, ServerConfig } from "./config-app-environment-interface";

export class ServerProcessConfig {
  async isAppStatusOk(serverConfig: ServerConfig): Promise<boolean> {
    switch (true) {
      case this.isServerApiEnvDemo(this.envKeys):
        console.log("✅ App is running on demo environment");
        return true;

      case !this.isServerApiEnvironmentOk(this.envKeys):
      case !(await this.isServerConfigOk(serverConfig)):
        return false;

      default:
        if (this.isEmailDemo(emailDemoConfig)) {
          console.warn(
            "⚠️ Email config is still using demo values even though the server is running live. Be sure to update before handing to client"
          );
        }

         console.warn(
            `✅ App is running on live environment: ${serverConfig.userId}`
          );

        return true;
        
    }
  }

  private isEmailDemo(config: EmailConfig): boolean {
    return JSON.stringify(config) === JSON.stringify(emailDemoConfig);
  }

  private envKeys = [
    "SUPABASE_URL",
    "SUPABASE_ANON_KEY",
    "RSVP_TABLE_NAME",
    "SERVER_EMAIL",
    "SERVER_PASSWORD",
    "SERVER_USER_ID"
  ];

  private isServerApiEnvDemo(envKeys: string[]): boolean {
   
  return envKeys.some((key) => {
    const value = process.env[key];
    return !value || value.trim() === "";
  });
  }

  private isServerApiEnvironmentOk(envKeys: string[]): boolean {
   const missingKeys = this.getMissingServerEnvKeys(envKeys);

  if (missingKeys.length > 0) {
    console.error(
      "⚠️ The following required env vars are missing or empty:",
      missingKeys.join(", ")
    );
    return false;
  }

  return true;
  }

 

private getMissingServerEnvKeys(envKeys: string[]): string[] {
  return envKeys.filter((key) => {
    const value = process.env[key];
    return !value || value.trim() === "";
  });
}


  private async isServerConfigOk(config: ServerConfig): Promise<boolean> {
    try {
      const supabase = createClient(config.supabaseKey, config.supabaseAnonKey);

      const { data, error } = await supabase
        .from(config.rsvpTableName)
        .select("*")
        .limit(1);

      if (error) {
        console.error("❌ Supabase config validation failed:", error.message);
        return false;
      }

      return true;
    } catch (e: any) {
      console.error("❌ Supabase connection error:", e.message);
      return false;
    }
  }
}
