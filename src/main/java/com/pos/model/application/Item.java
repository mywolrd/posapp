package com.pos.model.application;

import com.google.common.base.Objects;
import com.pos.model.parameter.ItemParameter;

public class Item {

    private long id;
    private long itemTypeId;
    private String name;
    private Price price;
    private int weight;
    private boolean active;

    public static class ItemBuilder {

        private long id;
        private final long itemTypeId;
        private final Price price;
        private String name;
        private int weight;
        private boolean active;

        public ItemBuilder(long itemTypeId, Price price) {
            this.itemTypeId = itemTypeId;
            this.price = price;
        }

        public ItemBuilder(ItemParameter item) {
            this.id = item.getId();
            this.itemTypeId = item.getItemTypeId();
            this.price = new Price.PriceBuilder().dollar(item.getDollar())
                    .cent(item.getCent()).build();
            this.name = item.getName();
            this.weight = item.getWeight();
            this.active = item.isActive();
        }

        public ItemBuilder(Item item) {
            this.id = item.getId();
            this.itemTypeId = item.getItemTypeId();
            this.price = new Price.PriceBuilder()
                    .dollar(item.getPrice().getDollar())
                    .cent(item.getPrice().getCent()).build();
            this.name = item.getName();
            this.weight = item.getWeight();
            this.active = item.isActive();
        }

        public ItemBuilder name(String name) {
            this.name = name;
            return this;
        }

        public ItemBuilder id(long id) {
            this.id = id;
            return this;
        }

        public ItemBuilder weight(int weight) {
            this.weight = weight;
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
        this.itemTypeId = builder.itemTypeId;
        this.name = builder.name;
        this.price = builder.price;
        this.active = builder.active;
        this.weight = builder.weight;
    }

    public long getId() {
        return id;
    }

    public long getItemTypeId() {
        return this.itemTypeId;
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

    public int getWeight() {
        return this.weight;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(this.id, this.name, this.price, this.itemTypeId,
                this.weight);
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

        return Objects.equal(this.id, other.id)
                && Objects.equal(this.name, other.name)
                && Objects.equal(this.price, other.price)
                && Objects.equal(this.itemTypeId, other.itemTypeId)
                && Objects.equal(this.weight, other.weight);
    }

}