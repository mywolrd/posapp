package com.pos.model.application;

import java.util.List;

public class MenuItem {

    private Item item;
    private List<MenuItem> submenu;

    public static class MenuBuilder {

        private Item item;
        private List<MenuItem> submenu;

        public MenuBuilder item(Item item) {
            this.item = item;
            return this;
        }

        public MenuBuilder submenu(List<MenuItem> item) {
            this.submenu = item;
            return this;
        }

        public MenuItem build() {
            return new MenuItem(this);
        }
    }

    private MenuItem(MenuBuilder builder) {
        this.item = builder.item;
        this.submenu = builder.submenu;
    }

    public Item getItem() {
        return item;
    }

    public String getName() {
        if (null == this.item.getName() || this.item.getName().isEmpty())
            return this.item.getItemType().getName();
        return this.item.getName();
    }

    public List<MenuItem> getSubmenu() {
        return this.submenu;
    }

    public boolean hasSubmenu() {
        return this.submenu != null && !this.submenu.isEmpty();
    }
}