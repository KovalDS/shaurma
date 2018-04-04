package com.epam.rd.shaurmastore.repository;

import com.epam.rd.shaurmastore.domain.OrderEntry;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the OrderEntry entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderEntryRepository extends JpaRepository<OrderEntry, Long> {

}
