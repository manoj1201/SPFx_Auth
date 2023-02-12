import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IAadclientProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  webpartcontext: WebPartContext;
}
