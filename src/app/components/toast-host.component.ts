import { Component, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ToastService } from "../services/toast.service"

@Component({
  selector: "app-toast-host",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container" role="status" aria-live="polite" aria-atomic="true">
      @for (toast of toastService.toasts$(); track toast.id) {
        <div class="toast" [attr.data-toast-id]="toast.id">
          {{ toast.message }}
        </div>
      }
    </div>
  `,
  styles: [
    `
    .toast-container {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-width: 90vw;
    }

    .toast {
      background-color: #1f2937;
      color: white;
      padding: 0.875rem 1.25rem;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      font-size: 0.875rem;
      line-height: 1.25rem;
      min-width: 250px;
      animation: slideIn 0.2s ease-out, fadeOut 0.3s ease-in 2.2s forwards;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }

    @media (max-width: 640px) {
      .toast-container {
        bottom: 1rem;
        right: 1rem;
        left: 1rem;
      }

      .toast {
        min-width: auto;
        width: 100%;
      }
    }
  `,
  ],
})
export class ToastHostComponent {
  readonly toastService = inject(ToastService)
}
