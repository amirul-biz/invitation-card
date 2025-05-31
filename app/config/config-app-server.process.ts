import { createClient } from "@supabase/supabase-js";
import { emailDemoConfig, serverDemoConfig } from "./config-app-environment";
import { EmailConfig, ServerConfig } from "./config-app-environment-interface";

export class ServerProcessConfig {
  async isAppStatusOk(serverConfig: ServerConfig): Promise<boolean> {
    switch (true) {
      case this.isServerApiEnvDemo(serverConfig):
        console.log("✅ App is running on demo environment");
        return true;

      case !this.isServerApiEnvironmentOk(serverConfig):
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

  private isServerApiEnvDemo(config: ServerConfig): boolean {
    const demoKeys = Object.keys(serverDemoConfig) as (keyof ServerConfig)[];
    return demoKeys.every((key) => config[key] === serverDemoConfig[key]);
  }

  private isServerApiEnvironmentOk(config: ServerConfig): boolean {
    const fallbackKeys = this.getMismatchServerEnvKeys(config);

    if (fallbackKeys.length > 0) {
      console.error(
        "⚠️ The following keys are using fallback demo values. Check your environment variables:",
        fallbackKeys.join(", ")
      );
      return false;
    }

    return true;
  }

  private getMismatchServerEnvKeys(config: ServerConfig): string[] {
    const fallbackKeys: string[] = [];

    Object.keys(serverDemoConfig).forEach((key) => {
      if ((config as any)[key] === (serverDemoConfig as any)[key]) {
        fallbackKeys.push(key);
      }
    });

    return fallbackKeys;
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
