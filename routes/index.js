var express = require('express');
var router = express();
var ctrlMain = require("../main");

/*
 * GET home page.
 */
router.get('/', ctrlMain.home);

/*
 * GET login fields page.
 */
router.get('/login', ctrlMain.get_login);

/*
 * POST login fields page.
 */
router.post('/customer-menu', ctrlMain.post_login, ctrlMain.loggedIn);

/*
 * GET sign up fields page.
 */
router.get('/signup', ctrlMain.get_signup);

/*
 * POST sign up fields page.
 */
router.post('/signup', ctrlMain.post_signup);

/*
 * GET post ad fields page.
 */
router.get('/postad', ctrlMain.get_postad);

/*
 * POST post ad fields page.
 */
router.post('/postad', ctrlMain.post_postad);

router.post('/search_apartments', ctrlMain.post_searchApartments);

router.post('/search_roommates', ctrlMain.post_searchRoommates);

/*
 * POST view apartment listings page.
 */
router.get('/get_apartment_listings', ctrlMain.get_apartment_listings);

/*
 * POST view room listings page.
 */
router.get('/get_room_listings', ctrlMain.get_room_listings);

/*
 * POST view roommate listings page.
 */
router.get('/get_roommate_listings', ctrlMain.get_roommate_listings);

/*
 * POST view sublet listings page.
 */
router.get('/get_sublet_listings', ctrlMain.get_sublet_listings);

/*
 * POST view tenant listings page.
 */
router.get('/get_tenant_listings', ctrlMain.get_tenant_listings);

router.post('/change_password', ctrlMain.post_change_password);

router.post('/delete_account', ctrlMain.post_delete_account);

router.post('/delete-account-password', ctrlMain.post_confirm_delete_account);

router.delete('/delete_customer_account/:id',ctrlMain.post_delete_customer_account);

router.put('/update_listing/:id', ctrlMain.put_update_listing);

router.post('/add_listing/:id',ctrlMain.add_listing);

router.post('/confirm-change-password', ctrlMain.post_confirm_change_password);

router.post('/editListing', ctrlMain.post_editListing);

router.post('/delete_listing',ctrlMain.post_delete_listing);

router.post('/dataAnalytics',ctrlMain.post_dataAnalytics);

router.post('/deleteListing',ctrlMain.post_deleteListing);

router.post('/admin_delete_listing', ctrlMain.post_admin_delete_listing);

router.get('/logout', ctrlMain.post_logout);

router.post('/logout', ctrlMain.post_logout);

router.post('/apartment_listings', ctrlMain.post_apartment_listings);

router.post('/room_listings', ctrlMain.post_room_listings);

router.post('/roommate_listings', ctrlMain.post_roommate_listings);

router.post('/tenant_listings', ctrlMain.post_tenant_listings);

router.post('/sublet_listings', ctrlMain.post_sublet_listings);

router.post('/posting_advertisement', ctrlMain.post_advertisement);

router.get('/get_apartment_ad', ctrlMain.get_apartment_ad);

router.get('/get_roommate_ad', ctrlMain.get_roommate_ad);

router.post('/post_apartment_ad', ctrlMain.post_apartment_ad);

router.post('/post_roommate_ad', ctrlMain.post_roommate_ad);

module.exports = router;

