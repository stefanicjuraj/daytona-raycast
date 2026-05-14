/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** API Key - Your Daytona API key. */
  "apiKey": string,
  /** API URL - Daytona API URL. */
  "apiUrl": string,
  /** Default Target - Default region target for new sandboxes. */
  "target": "auto" | "us" | "eu"
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `create-sandbox` command */
  export type CreateSandbox = ExtensionPreferences & {}
  /** Preferences accessible in the `run-code` command */
  export type RunCode = ExtensionPreferences & {}
  /** Preferences accessible in the `create-snapshot` command */
  export type CreateSnapshot = ExtensionPreferences & {}
  /** Preferences accessible in the `quick-create-sandbox` command */
  export type QuickCreateSandbox = ExtensionPreferences & {}
  /** Preferences accessible in the `documentation` command */
  export type Documentation = ExtensionPreferences & {}
  /** Preferences accessible in the `dashboard` command */
  export type Dashboard = ExtensionPreferences & {}
  /** Preferences accessible in the `sandbox-web-terminal` command */
  export type SandboxWebTerminal = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `create-sandbox` command */
  export type CreateSandbox = {}
  /** Arguments passed to the `run-code` command */
  export type RunCode = {}
  /** Arguments passed to the `create-snapshot` command */
  export type CreateSnapshot = {}
  /** Arguments passed to the `quick-create-sandbox` command */
  export type QuickCreateSandbox = {}
  /** Arguments passed to the `documentation` command */
  export type Documentation = {}
  /** Arguments passed to the `dashboard` command */
  export type Dashboard = {}
  /** Arguments passed to the `sandbox-web-terminal` command */
  export type SandboxWebTerminal = {}
}

