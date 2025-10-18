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

  // TODO Storage, etc
}
