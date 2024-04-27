import { useCallback } from "react";
import { AppLayout } from "frontend/_layouts/app";
import { useSetPageDetails } from "frontend/lib/routing/usePageDetails";
import { NAVIGATION_LINKS } from "frontend/lib/routing/links";
import {
  FEPaginationTable,
  IFETableCell,
  IFETableColumn,
} from "frontend/components/FEPaginationTable";
import { SystemRoles } from "shared/types/user";
import { USER_PERMISSIONS } from "shared/constants/user";
import { IRolesList } from "shared/types/roles";
import { Card } from "frontend/design-system/components/Card";
import { DELETE_BUTTON_PROPS } from "frontend/design-system/components/Button/constants";
import { ActionButtons } from "frontend/design-system/components/Button/ActionButtons";
import { msg } from "@lingui/macro";
import {
  ADMIN_ROLES_CRUD_CONFIG,
  ROLES_ENDPOINT_CONFIG,
  useRoleDeletionMutation,
} from "./roles.store";

export function ListRoles() {
  useSetPageDetails({
    pageTitle: ADMIN_ROLES_CRUD_CONFIG.TEXT_LANG.TITLE,
    viewKey: `list-roles`,
    permission: USER_PERMISSIONS.CAN_MANAGE_PERMISSIONS,
  });

  const roleDeletionMutation = useRoleDeletionMutation();

  const MemoizedAction = useCallback(
    ({ row }: IFETableCell<IRolesList>) => {
      const roleId = row.original.value;
      if ((Object.values(SystemRoles) as string[]).includes(roleId)) {
        return null;
      }
      return (
        <ActionButtons
          justIcons
          actionButtons={[
            {
              id: "edit",
              action: NAVIGATION_LINKS.ROLES.DETAILS(roleId),
              label: ADMIN_ROLES_CRUD_CONFIG.TEXT_LANG.EDIT,
              systemIcon: "Edit",
            },
            {
              ...DELETE_BUTTON_PROPS({
                action: () => roleDeletionMutation.mutateAsync(roleId),
                label: ADMIN_ROLES_CRUD_CONFIG.TEXT_LANG.DELETE,
                isMakingRequest: false,
              }),
            },
          ]}
        />
      );
    },
    [roleDeletionMutation.isPending]
  );
  const columns: IFETableColumn<IRolesList>[] = [
    {
      Header: msg`Role`,
      accessor: "label",
      filter: {
        _type: "string",
        bag: undefined,
      },
    },
    {
      Header: msg`Action`,
      disableSortBy: true,
      accessor: "__action__",
      Cell: MemoizedAction,
    },
  ];

  return (
    <AppLayout
      actionItems={[
        {
          id: "add",
          label: ADMIN_ROLES_CRUD_CONFIG.TEXT_LANG.CREATE,
          systemIcon: "Plus",
          action: NAVIGATION_LINKS.ROLES.CREATE,
        },
      ]}
    >
      <Card>
        <FEPaginationTable
          dataEndpoint={ROLES_ENDPOINT_CONFIG.LIST}
          columns={columns}
          empty={{
            text: ADMIN_ROLES_CRUD_CONFIG.TEXT_LANG.EMPTY_LIST,
            createNew: {
              label: ADMIN_ROLES_CRUD_CONFIG.TEXT_LANG.CREATE,
              action: NAVIGATION_LINKS.ROLES.CREATE,
            },
          }}
        />
      </Card>
    </AppLayout>
  );
}
