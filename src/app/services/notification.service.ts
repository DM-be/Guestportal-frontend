import { Injectable, ɵConsole } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  public async showNotification(message: string): Promise<void> {
    try {
      await this.snackBar.open(message, undefined); // todo add color - centering in snackbar config
    } catch (error) {
      console.log(error);
    }
  }
}
