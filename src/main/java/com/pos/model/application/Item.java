package com.pos.model.application;

import com.google.common.base.Objects;

public class Item {

    private long id;
    private ItemType type;
    private String name;
    private Price price;
    private boolean active;

    public static class ItemBuilder {

        private long id;
        private final ItemType type;
        private final Price price;
        private String name;
        private boolean active;

        public ItemBuilder(ItemType type, Price price) {
            this.type = type;
            this.price = price;
        }

        public ItemBuilder name(String name) {
            this.name = name;
            return this;
        }

        public ItemBuilder id(long id) {
            this.id = id;
            return this;
        }

        public ItemBuilder active(boolean active) {
            this.active = active;
            return this;
        }

        public Item build() {
            return new Item(this);
        }
    }

    private Item(ItemBuilder builder) {
        this.id = builder.id;
        this.type = builder.type;
        this.name = builder.name;
        this.price = builder.price;
        this.active = builder.active;
    }

    public long getId() {
        return id;
    }

    public ItemType getItemType() {
        return this.type;
    }

    public String getName() {
        return name;
    }

    public Price getPrice() {
        return price;
    }

    public boolean isActive() {
        return this.active;
    }

    public String getItemName() {
        if (name != null && !name.isEmpty())
            return this.type.getName() + " " + name;
        return this.type.getName();
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(this.id, this.name, this.price, this.type);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Item other = (Item) obj;

        return Objects.equal(this.id, other.id) && Objects.equal(this.name, other.name) && Objects.equal(this.price, other.price) && Objects.equal(this.type, other.type);
    }

}