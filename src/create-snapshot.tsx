import { Action, ActionPanel, Form, Toast, getPreferenceValues, showToast } from "@raycast/api";
import { Daytona, DaytonaError } from "@daytona/sdk";

type Preferences = {
  apiKey: string;
  apiUrl?: string;
  target?: string;
};

type FormValues = {
  name: string;
  image: string;
};

export default function CreateSnapshotCommand() {
  async function handleSubmit(values: FormValues) {
    const snapshotName = values.name.trim();
    const imageName = values.image.trim();

    if (!snapshotName) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Snapshot name is required",
      });
      return;
    }

    if (!imageName) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Base image is required",
      });
      return;
    }

    const preferences = getPreferenceValues<Preferences>();
    const target = preferences.target && preferences.target !== "auto" ? preferences.target : undefined;
    const apiUrl = preferences.apiUrl?.trim() || undefined;

    const toast = await showToast({
      style: Toast.Style.Animated,
      title: "Creating snapshot",
    });

    try {
      const daytona = new Daytona({
        apiKey: preferences.apiKey,
        apiUrl,
        target,
      });

      const snapshot = await daytona.snapshot.create({
        name: snapshotName,
        image: imageName,
      });

      toast.style = Toast.Style.Success;
      toast.title = "Snapshot created";
      toast.message = `${snapshot.name} (${snapshot.id})`;
    } catch (error) {
      const message = error instanceof DaytonaError || error instanceof Error ? error.message : String(error);
      toast.style = Toast.Style.Failure;
      toast.title = "Failed to create snapshot";
      toast.message = message;
    }
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Create Snapshot" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="name" title="Name" placeholder="my-snapshot" />
      <Form.TextField id="image" title="Base Image" defaultValue="daytonaio/sandbox:0.6.0" />
    </Form>
  );
}
