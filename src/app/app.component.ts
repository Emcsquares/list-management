import { Component, type OnInit, signal, computed } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import type { Item, FilterType } from "./models/item.model"
import { StorageService } from "./services/storage.service"
import { ToastService } from "./services/toast.service"
import { ToastHostComponent } from "./components/toast-host.component"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, FormsModule, ToastHostComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  items = signal<Item[]>([])
  newItemText = signal("")
  editingItemId = signal<string | null>(null)
  editingText = signal("")
  currentFilter = signal<FilterType>("all")

  filteredItems = computed(() => {
    const filter = this.currentFilter()
    const allItems = this.items()

    switch (filter) {
      case "active":
        return allItems.filter((item) => !item.done)
      case "done":
        return allItems.filter((item) => item.done)
      default:
        return allItems
    }
  })

  hasCompletedItems = computed(() => this.items().some((item) => item.done))

  isAddButtonDisabled = computed(() => this.newItemText().trim().length === 0)

  constructor(
    private storageService: StorageService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    const loadedItems = this.storageService.loadItems()
    this.items.set(loadedItems)
  }

  private generateId(): string {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID()
    }
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  addItem(): void {
    const text = this.newItemText().trim()
    if (!text) return

    const newItem: Item = {
      id: this.generateId(),
      text,
      done: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    this.items.update((items) => [...items, newItem])
    this.saveItems()
    this.newItemText.set("")
    this.toastService.show("Item added")
  }

  startEdit(item: Item): void {
    this.editingItemId.set(item.id)
    this.editingText.set(item.text)
  }

  saveEdit(item: Item): void {
    const text = this.editingText().trim()
    if (!text) return

    this.items.update((items) => items.map((i) => (i.id === item.id ? { ...i, text, updatedAt: Date.now() } : i)))
    this.saveItems()
    this.cancelEdit()
    this.toastService.show("Item updated")
  }

  cancelEdit(): void {
    this.editingItemId.set(null)
    this.editingText.set("")
  }

  toggleDone(item: Item): void {
    this.items.update((items) =>
      items.map((i) => (i.id === item.id ? { ...i, done: !i.done, updatedAt: Date.now() } : i)),
    )
    this.saveItems()
  }

  private saveItems(): void {
    this.storageService.saveItems(this.items())
  }

  deleteItem(item: Item): void {
    this.items.update((items) => items.filter((i) => i.id !== item.id))
    this.saveItems()
    this.toastService.show("Item deleted")
  }

  clearCompleted(): void {
    const completedCount = this.items().filter((i) => i.done).length
    if (completedCount === 0) return

    this.items.update((items) => items.filter((i) => !i.done))
    this.saveItems()
    this.toastService.show(`Cleared ${completedCount} completed item${completedCount > 1 ? "s" : ""}`)
  }

  setFilter(filter: FilterType): void {
    this.currentFilter.set(filter)
  }

  onNewItemKeydown(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      event.preventDefault()
      this.addItem()
    }
  }

  onEditKeydown(event: KeyboardEvent, item: Item): void {
    if (event.key === "Enter") {
      event.preventDefault()
      this.saveEdit(item)
    } else if (event.key === "Escape") {
      event.preventDefault()
      this.cancelEdit()
    }
  }
}
