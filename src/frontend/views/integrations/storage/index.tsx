import { USER_PERMISSIONS } from "shared/constants/user";
import { useSetPageDetails } from "frontend/lib/routing/usePageDetails";
import { SectionBox } from "frontend/design-system/components/Section/SectionBox";
import { Tabs } from "frontend/design-system/components/Tabs";
import { msg } from "@lingui/macro";
import { BaseActionsLayout } from "../_Base";
import { ACTIONS_VIEW_KEY } from "../constants";
import { STORAGE_INTEGRATIONS_CRUD_CONFIG } from "./constants";

import { GeneralStorageSettings } from "./General";
import { StorageCredentialsSettings } from "./Credentials";

export function StorageIntegrations() {
  useSetPageDetails({
    pageTitle: STORAGE_INTEGRATIONS_CRUD_CONFIG.TEXT_LANG.TITLE,
    viewKey: ACTIONS_VIEW_KEY,
    permission: USER_PERMISSIONS.CAN_MANAGE_APP_CREDENTIALS,
  });

  return (
    <BaseActionsLayout>
      <SectionBox title={STORAGE_INTEGRATIONS_CRUD_CONFIG.TEXT_LANG.TITLE}>
        <Tabs
          contents={[
            {
              label: msg`Setup`,
              content: <StorageCredentialsSettings />,
            },
            {
              label: msg`General`,
              content: <GeneralStorageSettings />,
            },
          ]}
        />
      </SectionBox>
    </BaseActionsLayout>
  );
}
