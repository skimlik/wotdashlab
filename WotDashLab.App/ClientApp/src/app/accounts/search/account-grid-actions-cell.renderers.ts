import { ICellRendererParams } from 'ag-grid-community';

export function GetAccountGridCellRenderers() {
  function AccountActionsCellRenderer() {
  }

  AccountActionsCellRenderer.prototype.init = function(params: ICellRendererParams) {
    const data = params.data;
    const container = document.createElement('div');

    if (data) {
      const navigateLink = document.createElement('i');

      navigateLink.classList.add('fa', 'fa-chain');
      navigateLink.setAttribute('style', 'cursor: pointer;');

      this.clickListener = function() {
        const ctx = params.context;
        if (ctx && ctx.componentParent && ctx.componentParent.openProfile) {
          ctx.componentParent.openProfile(data.account_id);
        }
      };

      container.addEventListener('click', this.clickListener);
      container.appendChild(navigateLink);
    }
    this.eGui = container;
  };

  AccountActionsCellRenderer.prototype.refresh = function() {
    return false;
  };

  AccountActionsCellRenderer.prototype.getGui = function() {
    return this.eGui;
  };

  AccountActionsCellRenderer.prototype.destroy = function() {
    this.eGui.removeEventListener('click', this.clickListener);
  };

  return AccountActionsCellRenderer;
}
