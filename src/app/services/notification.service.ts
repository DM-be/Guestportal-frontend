import { Injectable, ɵConsole } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  private matSnackbarConfig: MatSnackBarConfig;
  constructor(private snackBar: MatSnackBar) {
    this.matSnackbarConfig = {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 1500,
      panelClass: ['successPanel']
    };
    //TODO: add support for green(success and red-> no succes)
  }

  public async showNotification(message: string): Promise<void> {
    try {
      this.snackBar.open(message, undefined, this.matSnackbarConfig); // todo add color - centering in snackbar config
    } catch (error) {
      console.log(error);
    }
  }
}
