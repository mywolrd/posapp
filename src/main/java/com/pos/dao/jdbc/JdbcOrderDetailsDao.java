package com.pos.dao.jdbc;

import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import com.pos.dao.OrderDetailsDao;
import com.pos.model.application.OrderDetails;

@Repository
public class JdbcOrderDetailsDao extends JdbcBaseDao implements OrderDetailsDao {

    private final static String uniqueById = "SELECT * from ORDER_DETAILS where ORDER_DETAILS.id = :id";
    private final static String listByOrderId = "SELECT * from ORDER_DETAILS where ORDER_DETAILS.orderId = :orderId";
    private final static String save = "INSERT INTO ORDER_DETAILS (orderId, itemId, quantity, newdollar, newcent) values (:orderId, :itemId, :quantity, :dollar, :cent)";
    private final static String deactive = "UPDATE ORDER_DETAILS set active = :active where ORDER_DETAILS.id = :id";

    @Override
    public OrderDetails uniqueById(long id) {
        SqlParameterSource parameter = new MapSqlParameterSource().addValue(DBNames.ID, id);
        try {
            return this.namedParameterJdbcTemplate.queryForObject(uniqueById, parameter, new BeanPropertyRowMapper<>(OrderDetails.class));
        } catch (DataAccessException e) {
            return null;
        }
    }

    @Override
    public List<OrderDetails> listByOrderId(long orderId) {
        SqlParameterSource parameter = new MapSqlParameterSource().addValue(DBNames.ORDERID, orderId);
        try {
            return this.namedParameterJdbcTemplate.query(listByOrderId, parameter, new BeanPropertyRowMapper<>(OrderDetails.class));
        } catch (DataAccessException e) {
            return null;
        }
    }

    @Override
    public void save(OrderDetails details) {

    }

    @Override
    public void update(OrderDetails details) {

    }

    @Override
    public void delete(OrderDetails details) {

    }

}