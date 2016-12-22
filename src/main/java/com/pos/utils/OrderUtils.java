package com.pos.utils;

import java.time.ZoneId;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
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
import com.pos.model.web.W_Order;
import com.pos.model.web.W_OrderDetail;
import com.pos.model.web.W_OrderDetailAddonItem;

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

        order.setQuantity(param.getQuantity());
        order.setDollar(param.getDollar());
        order.setCent(param.getCent());

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

    public W_OrderDetailAddonItem to_W_OrderDetailAddonItem(
            OrderDetailAddonItem addonItem) {
        W_OrderDetailAddonItem _addonItem = new W_OrderDetailAddonItem();
        _addonItem.setId(addonItem.getId());
        _addonItem.setAddonItemId(addonItem.getAddonItemId());
        _addonItem.setActive(addonItem.isActive());
        _addonItem.setNewPrice(addonItem.getNewPrice());
        return _addonItem;
    }

    public W_OrderDetail to_W_OrderDetail(OrderDetail orderDetail) {
        W_OrderDetail _orderDetail = new W_OrderDetail();
        _orderDetail.setId(orderDetail.getId());
        _orderDetail.setItemId(orderDetail.getItemId());
        _orderDetail.setQuantity(orderDetail.getQuantity());
        _orderDetail.setActive(orderDetail.isActive());
        _orderDetail.setNewPrice(orderDetail.getNewPrice());

        List<W_OrderDetailAddonItem> orderDetailAddonItems = new LinkedList<>();
        for (OrderDetailAddonItem addonItem : orderDetail
                .getOrderDetailAddonItems()) {
            orderDetailAddonItems.add(to_W_OrderDetailAddonItem(addonItem));
        }
        _orderDetail.setOrderDetailAddonItems(orderDetailAddonItems);
        return _orderDetail;
    }

    public W_Order to_W_Order(Order order) {
        if (order == null)
            return null;

        W_Order _order = new W_Order();
        _order.setId(order.getId());
        _order.setCustomerId(order.getCustomerId());

        _order.setActive(order.isActive());
        _order.setCompleted(order.isCompleted());
        _order.setVoided(order.isVoided());

        if (order.getDropDate() != null)
            _order.setDropDate(order.getDropDate()
                    .atZone(ZoneId.systemDefault()).toEpochSecond() * 1000);

        if (order.getReadyDate() != null)
            _order.setReadyDate(order.getReadyDate()
                    .atZone(ZoneId.systemDefault()).toEpochSecond() * 1000);

        if (order.getPickupDate() != null)
            _order.setPickupDate(order.getPickupDate()
                    .atZone(ZoneId.systemDefault()).toEpochSecond() * 1000);

        _order.setQuantity(order.getQuantity());
        _order.setDollar(order.getDollar());
        _order.setCent(order.getCent());

        List<W_OrderDetail> orderDetails = new LinkedList<>();
        for (OrderDetail detail : order.getDetails()) {
            orderDetails.add(to_W_OrderDetail(detail));
        }
        _order.setOrderDetails(orderDetails);
        return _order;
    }
}