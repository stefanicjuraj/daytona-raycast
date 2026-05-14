import { Action, ActionPanel, Detail, Form, Toast, getPreferenceValues, showToast, useNavigation } from "@raycast/api";
import { CodeLanguage, Daytona, DaytonaError } from "@daytona/sdk";

type Preferences = {
  apiKey: string;
  apiUrl?: string;
  target?: string;
};

type FormValues = {
  language: string;
  code: string;
};

function RunResultDetail(props: { language: string; sandboxId: string; exitCode: number; output: string }) {
  const outputBlock = props.output.trim().length > 0 ? props.output : "(no output)";

  return (
    <Detail
      markdown={[
        "# Execution Result",
        "",
        `- Language: \`${props.language}\``,
        `- Sandbox ID: \`${props.sandboxId}\``,
        `- Exit Code: \`${props.exitCode}\``,
        "",
        "## Output",
        "```",
        outputBlock,
        "```",
      ].join("\n")}
    />
  );
}

export default function RunCodeCommand() {
  const { push } = useNavigation();

  async function handleSubmit(values: FormValues) {
    if (!values.code.trim()) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Code is required",
      });
      return;
    }

    const preferences = getPreferenceValues<Preferences>();
    const target = preferences.target && preferences.target !== "auto" ? preferences.target : undefined;
    const apiUrl = preferences.apiUrl?.trim() || undefined;

    const toast = await showToast({
      style: Toast.Style.Animated,
      title: "Running code in sandbox",
    });

    const daytona = new Daytona({
      apiKey: preferences.apiKey,
      apiUrl,
      target,
    });

    let sandbox: Awaited<ReturnType<Daytona["create"]>> | undefined;

    try {
      sandbox = await daytona.create({
        language: values.language,
      });

      const response = await sandbox.process.codeRun(values.code);

      toast.style = Toast.Style.Success;
      toast.title = "Code executed";
      toast.message = `Exit code ${response.exitCode}`;

      push(
        <RunResultDetail
          language={values.language}
          sandboxId={sandbox.id}
          exitCode={response.exitCode}
          output={response.result}
        />,
      );
    } catch (error) {
      const message = error instanceof DaytonaError || error instanceof Error ? error.message : String(error);
      toast.style = Toast.Style.Failure;
      toast.title = "Execution failed";
      toast.message = message;
    } finally {
      if (sandbox) {
        try {
          await sandbox.delete();
        } catch {
          // Ignore cleanup errors for this quick-run command.
        }
      }
    }
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Run Code" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextArea id="code" title="Code Snippet" placeholder="Paste code to execute" />
      <Form.Dropdown id="language" title="Language" defaultValue={CodeLanguage.PYTHON}>
        <Form.Dropdown.Item title="Python" value={CodeLanguage.PYTHON} />
        <Form.Dropdown.Item title="TypeScript" value={CodeLanguage.TYPESCRIPT} />
        <Form.Dropdown.Item title="JavaScript" value={CodeLanguage.JAVASCRIPT} />
      </Form.Dropdown>
    </Form>
  );
}
