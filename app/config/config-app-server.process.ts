'use server'
import { createClient } from "@supabase/supabase-js";
import { emailDemoConfig, serverConfig, serverDemoConfig } from "./config-app-environment";
import { EmailConfig, ServerConfig } from "./config-app-environment-interface";

export async function isAppServerStatusOk(): Promise<boolean> {

  await isDemoEnv()

  return getServerEnvironmentInfoOK() 
  
}



  async function getServerEnvironmentInfoOK():Promise<boolean> {
  const supabase = createClient(serverConfig.supabaseKey, serverConfig.supabaseAnonKey);
  
  try {
    const { data, error } = await supabase.functions.invoke("environment-info");
    
    if (error) throw error;
    console.log(data)
    return true
    
  } catch (error) {
    console.log({
      status: "offline",
      message: "Could not verify environment",
      isFallback: true
    })
    return false
  }

}

async function isDemoEnv(): Promise<boolean>{
  const isDemoEnv = JSON.stringify(serverConfig) === JSON.stringify(serverDemoConfig) 
  isDemoEnv?  console.log('environment using demo env') : console.log('App is live env')
  return isDemoEnv
}


// export class ServerProcessConfig {
//   async isAppStatusOk(serverConfig: ServerConfig): Promise<boolean> {
//     await this.getServerEnvironmentInfo(serverConfig);
//     switch (true) {
//       case !(await this.isServerConfigOk(serverConfig)):
//         return false;

//       default:
//         if (this.isEmailDemo(emailDemoConfig)) {
//           console.warn(
//             "⚠️ Email config is still using demo values even though the server is running live. Be sure to update before handing to client"
//           );
//         }

//         return true;
//     }
//   }

//   private isEmailDemo(config: EmailConfig): boolean {
//     return JSON.stringify(config) === JSON.stringify(emailDemoConfig);
//   }

  
//   private async isServerConfigOk(config: ServerConfig): Promise<boolean> {
//     try {
//       const supabase = createClient(config.supabaseKey, config.supabaseAnonKey);

//       const { data, error } = await supabase
//         .from(config.rsvpTableName)
//         .select("*")
//         .limit(1);

//       if (error) {
//         console.error("❌ Supabase config validation failed:", error.message);
//         return false;
//       }

//       return true;
//     } catch (e: any) {
//       console.error("❌ Supabase connection error:", e.message);
//       return false;
//     }
//   }

//  private async getServerEnvironmentInfo(config: ServerConfig) {
//   const supabase = createClient(config.supabaseKey, config.supabaseAnonKey);
  
//   try {
//     const { data, error } = await supabase.functions.invoke("environment-info");
    
//     if (error) throw error;
//     console.log("Environment status:", data);
//     return data;
    
//   } catch (error) {
//     console.error("Check failed:", error);
//     return {
//       status: "offline",
//       message: "Could not verify environment",
//       isFallback: true
//     };
//   }
// }
// }
