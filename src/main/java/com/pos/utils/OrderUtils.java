package com.pos.utils;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Component;

import com.pos.model.parameter.OrderDetailAddonItemParameter;
import com.pos.model.parameter.OrderDetailParameter;
import com.pos.model.parameter.OrderParameter;
import com.pos.model.parameter.PriceParameter;
import com.pos.model.persist.Order;
import com.pos.model.persist.OrderDetail;
import com.pos.model.persist.OrderDetailAddonItem;
import com.pos.model.persist.Price;

@Component
public class OrderUtils {
    public OrderDetailAddonItem to_OrderDetailAddonItem(
            OrderDetailAddonItemParameter param) {

        OrderDetailAddonItem addonItem = new OrderDetailAddonItem();
        addonItem.setId(param.getId());
        addonItem.setAddonItemId(param.getAddonItemId());
        addonItem.setActive(param.isActive());
        addonItem.setNewPrice(to_Price(param.getNewPrice()));
        return addonItem;
    }

    public OrderDetail to_OrderDetail(OrderDetailParameter param) {
        OrderDetail detail = new OrderDetail();
        detail.setId(param.getId());
        detail.setItemId(param.getItemId());
        detail.setQuantity(param.getQuantity());
        detail.setNewPrice(to_Price(param.getNewPrice()));
        detail.setActive(param.isActive());

        Set<OrderDetailAddonItem> addonItems = new HashSet<>();
        for (OrderDetailAddonItemParameter addonItem : param
                .getOrderDetailAddonItems()) {
            addonItems.add(to_OrderDetailAddonItem(addonItem));
        }
        detail.setOrderDetailAddonItems(addonItems);

        return detail;
    }

    public Order to_Order(OrderParameter param) {
        Order order = new Order();
        order.setId(param.getId());
        order.setCustomerId(param.getCustomerId());

        order.setDropDate(param.getDropDate());
        order.setReadyDate(param.getReadyDate());
        order.setPickupDate(param.getPickupDate());

        order.setActive(param.isActive());
        order.setCompleted(param.isCompleted());
        order.setVoided(param.isVoided());

        Set<OrderDetail> details = new HashSet<>();
        for (OrderDetailParameter detail : param.getOrderDetails()) {
            details.add(to_OrderDetail(detail));
        }
        order.setDetails(details);
        return order;
    }

    public Price to_Price(PriceParameter param) {
        if (param == null)
            return null;

        Price price = new Price();
        price.setCent(param.getCent());
        price.setDollar(param.getDollar());
        return price;
    }
}