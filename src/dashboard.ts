import { open } from "@raycast/api";

export default async function DashboardCommand() {
  await open("https://app.daytona.io/");
}
