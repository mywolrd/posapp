package com.pos.dao.hibernate;

import java.util.List;

import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.pos.dao.CustomerDao;
import com.pos.model.persist.Customer;

@Repository
public class HibernateCustomerDao extends HibernateBaseDao<Customer, Long>
        implements CustomerDao {

    @Override
    public List<Customer> searchByLikeLastName(String querystr) {
        return this.findByCriteria(Restrictions.ilike(DBNames.LASTNAME,
                querystr, MatchMode.START));
    }

}