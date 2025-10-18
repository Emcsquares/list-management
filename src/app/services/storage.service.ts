import { Injectable } from "@angular/core"
import type { Item } from "../models/item.model"

@Injectable({
  providedIn: "root",
})
export class StorageService {
  private readonly STORAGE_KEY = "list-manager:v1:items"

  loadItems(): Item[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY)
      if (!data) return []
      return JSON.parse(data)
    } catch (error) {
      console.error("Failed to load items from localStorage:", error)
      return []
    }
  }

  saveItems(items: Item[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items))
    } catch (error) {
      console.error("Failed to save items to localStorage:", error)
    }
  }
}