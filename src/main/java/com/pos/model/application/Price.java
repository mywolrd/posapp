package com.pos.model.application;

import com.google.common.base.Objects;
import com.pos.utils.Utils;

public class Price {

    private int dollar;
    private int cent;

    public static class PriceBuilder {

        private int dollar = Utils.ZERO;
        private int cent = Utils.ZERO;

        public PriceBuilder dollar(final int dollar) {
            this.dollar = dollar;
            return this;
        }

        public PriceBuilder cent(final int cent) {
            this.cent = cent;
            return this;
        }

        public Price build() {
            return new Price(this);
        }
    }

    private Price(PriceBuilder priceBuilder) {
        this.dollar = priceBuilder.dollar;
        this.cent = priceBuilder.cent;
    }

    public int getDollar() {
        return dollar;
    }

    public int getCent() {
        return cent;
    }

    public boolean isNothing() {
        return this.dollar == Utils.ZERO && this.cent == Utils.ZERO;
    }

    public static Price nothing() {
        return new Price.PriceBuilder().dollar(Utils.ZERO).cent(Utils.ZERO).build();
    }

    public static Price add(Price a, Price b) {
        int dollar = a.getDollar() + b.getDollar();
        int totalCent = a.getCent() + b.getCent();
        int cent = totalCent % 100;
        dollar += (totalCent / 100);
        return new Price.PriceBuilder().dollar(dollar).cent(cent).build();
    }

    public static Price multiply(Price a, int num) {
        int dollar = a.getDollar() * num;
        int totalCent = a.getCent() * num;
        int cent = totalCent % 100;
        dollar += (totalCent / 100);
        return new Price.PriceBuilder().dollar(dollar).cent(cent).build();
    }

    @Override
    public String toString() {
        return new StringBuilder().append(Integer.toString(this.dollar)).append(".").append(Integer.toString(this.cent)).toString();
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(this.cent, this.dollar);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;

        Price other = (Price) obj;

        return Objects.equal(this.cent, other.cent) && Objects.equal(this.dollar, other.dollar);
    }
}