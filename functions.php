<?php
/**
 * Crypto engine room
 *
 * @package Crypto_News
 */

/**
 * Assign the crypto version to a var
 */
$theme              = wp_get_theme( 'crypto' );
$crypto_news_version = $theme['Version'];

/**
 * Set the content width based on the theme's design and stylesheet.
 */
if ( ! isset( $content_width ) ) {
	$content_width = 980; /* pixels */
}

$crypto_news = (object) array(
	'version' => $crypto_news_version,

	/**
	 * Initialize all the things.
	 */
	'main'       => require 'inc/class-crypto-news.php',
	'customizer' => require 'inc/customizer/class-crypto-news-customizer.php',
);

require 'inc/crypto-news-functions.php';
require 'inc/crypto-news-template-hooks.php';
require 'inc/crypto-news-template-functions.php';
require 'inc/crypto-news-callback-functions.php';

if ( is_admin() ) {

	$crypto_news->admin = require 'inc/admin/class-crypto-news-admin.php';

}