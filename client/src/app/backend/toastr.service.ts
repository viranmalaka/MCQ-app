/**
 * Created by malaka on 10/1/17.
 */

import {Injectable, ViewContainerRef} from "@angular/core";
import {ToastsManager} from "ng2-toastr";
@Injectable()
export class ToastService {
  constructor(private toastMngr: ToastsManager){

  }

  public toast(): ToastsManager {
    return this.toastMngr;
  }

  public setVCR(vcr: ViewContainerRef){
    this.toastMngr.setRootViewContainerRef(vcr);
  }
}
