const { router } = require('express');

const { seller, customer, service } = require('../controllers')

const router = Router();

router.get('/seller/:id', seller.getSeller);
router.post('/seller/register', seller.postRegister);
router.post('/seller/login', seller.postLogin);
router.put('/seller/:id', seller.putSeller);
router.delete('/seller/:id', seller.deleteSeller);

router.get('/customer/:id', customer.getCustomer);
router.post('/customer/register', customer.postRegister);
router.post('/customer/login', customer.postLogin);
router.put('/customer/:id', customer.putCustomer);
router.delete('/customer/:id', customer.deleteCustomer);

router.get('/services', service.getService);
router.get('/services/:id', service.getDetailService);
router.post('/services', service.postService);
router.put('/services/:id', service.putService);
router.delete('/services/:id', service.deleteService);


module.exports = router;


