import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  private matSnackbarConfig: MatSnackBarConfig;
  constructor(private snackBar: MatSnackBar) {
  }


  private generateSnackbarConfig(panelClass: string): MatSnackBarConfig {
    return {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 2500,
      panelClass: [panelClass]
    };
  }
  
  public async showNotification(message: string, success: boolean): Promise<void> {
    try {
      if(success)
      {
        this.snackBar.open(message, undefined, this.generateSnackbarConfig('successPanel')); // todo add color - centering in snackbar config
      }
      else {
        this.snackBar.open(message, undefined, this.generateSnackbarConfig('dangerPanel')); // todo add color - centering in snackbar config
      }
      
    } catch (error) {
      console.log(error);
    }
  }
}
