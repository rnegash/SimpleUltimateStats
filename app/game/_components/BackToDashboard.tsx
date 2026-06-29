"use client";

import Link from "next/link";
import { AlertDialog, Button, useOverlayState } from "@heroui/react";
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
                  <Link
                    href="/dashboard"
                    className="rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                  >
                    {copy.gamePage.events.actions.backWarning.confirm}
                  </Link>
                </AlertDialog.Footer>
              </>
            )}
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};
