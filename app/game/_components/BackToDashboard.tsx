"use client";

import { AlertDialog, Button, useOverlayState } from "@heroui/react";
import { LinkButton } from "@/app/_components/LinkButton";
import { copy } from "@/app/_assets/strings";

export const BackToDashboard = () => {
  const dialogState = useOverlayState();

  return (
    <AlertDialog>
      <Button size="sm" onPress={dialogState.open}>
        {copy.gamePage.events.actions.back}
      </Button>
      <AlertDialog.Backdrop
        isOpen={dialogState.isOpen}
        onOpenChange={dialogState.setOpen}
      >
        <AlertDialog.Container placement="center" size="sm">
          <AlertDialog.Dialog>
            {({ close }) => (
              <>
                <AlertDialog.Header>
                  <AlertDialog.Heading>
                    {copy.gamePage.events.actions.backWarning.title}
                  </AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  {copy.gamePage.events.actions.backWarning.description}
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button onPress={close}>
                    {copy.gamePage.events.actions.backWarning.cancel}
                  </Button>
                  <LinkButton href="/dashboard" variant="danger">
                    {copy.gamePage.events.actions.backWarning.confirm}
                  </LinkButton>
                </AlertDialog.Footer>
              </>
            )}
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};
