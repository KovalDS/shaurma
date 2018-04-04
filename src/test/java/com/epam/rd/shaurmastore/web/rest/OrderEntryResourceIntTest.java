package com.epam.rd.shaurmastore.web.rest;

import com.epam.rd.shaurmastore.ShaurmaStoreApp;

import com.epam.rd.shaurmastore.domain.OrderEntry;
import com.epam.rd.shaurmastore.repository.OrderEntryRepository;
import com.epam.rd.shaurmastore.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.List;

import static com.epam.rd.shaurmastore.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the OrderEntryResource REST controller.
 *
 * @see OrderEntryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ShaurmaStoreApp.class)
public class OrderEntryResourceIntTest {

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    private static final BigDecimal DEFAULT_PRICE = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRICE = new BigDecimal(2);

    @Autowired
    private OrderEntryRepository orderEntryRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOrderEntryMockMvc;

    private OrderEntry orderEntry;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrderEntryResource orderEntryResource = new OrderEntryResource(orderEntryRepository);
        this.restOrderEntryMockMvc = MockMvcBuilders.standaloneSetup(orderEntryResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrderEntry createEntity(EntityManager em) {
        OrderEntry orderEntry = new OrderEntry()
            .quantity(DEFAULT_QUANTITY)
            .price(DEFAULT_PRICE);
        return orderEntry;
    }

    @Before
    public void initTest() {
        orderEntry = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrderEntry() throws Exception {
        int databaseSizeBeforeCreate = orderEntryRepository.findAll().size();

        // Create the OrderEntry
        restOrderEntryMockMvc.perform(post("/api/order-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderEntry)))
            .andExpect(status().isCreated());

        // Validate the OrderEntry in the database
        List<OrderEntry> orderEntryList = orderEntryRepository.findAll();
        assertThat(orderEntryList).hasSize(databaseSizeBeforeCreate + 1);
        OrderEntry testOrderEntry = orderEntryList.get(orderEntryList.size() - 1);
        assertThat(testOrderEntry.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testOrderEntry.getPrice()).isEqualTo(DEFAULT_PRICE);
    }

    @Test
    @Transactional
    public void createOrderEntryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orderEntryRepository.findAll().size();

        // Create the OrderEntry with an existing ID
        orderEntry.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderEntryMockMvc.perform(post("/api/order-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderEntry)))
            .andExpect(status().isBadRequest());

        // Validate the OrderEntry in the database
        List<OrderEntry> orderEntryList = orderEntryRepository.findAll();
        assertThat(orderEntryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllOrderEntries() throws Exception {
        // Initialize the database
        orderEntryRepository.saveAndFlush(orderEntry);

        // Get all the orderEntryList
        restOrderEntryMockMvc.perform(get("/api/order-entries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderEntry.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.intValue())));
    }

    @Test
    @Transactional
    public void getOrderEntry() throws Exception {
        // Initialize the database
        orderEntryRepository.saveAndFlush(orderEntry);

        // Get the orderEntry
        restOrderEntryMockMvc.perform(get("/api/order-entries/{id}", orderEntry.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(orderEntry.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingOrderEntry() throws Exception {
        // Get the orderEntry
        restOrderEntryMockMvc.perform(get("/api/order-entries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrderEntry() throws Exception {
        // Initialize the database
        orderEntryRepository.saveAndFlush(orderEntry);
        int databaseSizeBeforeUpdate = orderEntryRepository.findAll().size();

        // Update the orderEntry
        OrderEntry updatedOrderEntry = orderEntryRepository.findOne(orderEntry.getId());
        // Disconnect from session so that the updates on updatedOrderEntry are not directly saved in db
        em.detach(updatedOrderEntry);
        updatedOrderEntry
            .quantity(UPDATED_QUANTITY)
            .price(UPDATED_PRICE);

        restOrderEntryMockMvc.perform(put("/api/order-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrderEntry)))
            .andExpect(status().isOk());

        // Validate the OrderEntry in the database
        List<OrderEntry> orderEntryList = orderEntryRepository.findAll();
        assertThat(orderEntryList).hasSize(databaseSizeBeforeUpdate);
        OrderEntry testOrderEntry = orderEntryList.get(orderEntryList.size() - 1);
        assertThat(testOrderEntry.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testOrderEntry.getPrice()).isEqualTo(UPDATED_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingOrderEntry() throws Exception {
        int databaseSizeBeforeUpdate = orderEntryRepository.findAll().size();

        // Create the OrderEntry

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOrderEntryMockMvc.perform(put("/api/order-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderEntry)))
            .andExpect(status().isCreated());

        // Validate the OrderEntry in the database
        List<OrderEntry> orderEntryList = orderEntryRepository.findAll();
        assertThat(orderEntryList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOrderEntry() throws Exception {
        // Initialize the database
        orderEntryRepository.saveAndFlush(orderEntry);
        int databaseSizeBeforeDelete = orderEntryRepository.findAll().size();

        // Get the orderEntry
        restOrderEntryMockMvc.perform(delete("/api/order-entries/{id}", orderEntry.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OrderEntry> orderEntryList = orderEntryRepository.findAll();
        assertThat(orderEntryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderEntry.class);
        OrderEntry orderEntry1 = new OrderEntry();
        orderEntry1.setId(1L);
        OrderEntry orderEntry2 = new OrderEntry();
        orderEntry2.setId(orderEntry1.getId());
        assertThat(orderEntry1).isEqualTo(orderEntry2);
        orderEntry2.setId(2L);
        assertThat(orderEntry1).isNotEqualTo(orderEntry2);
        orderEntry1.setId(null);
        assertThat(orderEntry1).isNotEqualTo(orderEntry2);
    }
}
