import { Injectable, signal } from "@angular/core"

export interface Toast {
  id: string
  message: string
}

@Injectable({
  providedIn: "root",
})
export class ToastService {
  private toasts = signal<Toast[]>([])
  readonly toasts$ = this.toasts.asReadonly()

  show(message: string): void {
    const id = this.generateId()
    const toast: Toast = { id, message }

    this.toasts.update((toasts) => [...toasts, toast])

    // Auto-dismiss after 2.5 seconds
    setTimeout(() => {
      this.dismiss(id)
    }, 2500)
  }

  dismiss(id: string): void {
    this.toasts.update((toasts) => toasts.filter((t) => t.id !== id))
  }

  private generateId(): string {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID()
    }
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }
}
