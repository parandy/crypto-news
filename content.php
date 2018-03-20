<?php
/**
 * Template used to display post content.
 *
 * @package Crypto_News
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<?php
	/**
	 * Functions hooked in to crypto_news_loop_post action.
	 *
	 * @hooked crypto_news_post_header          - 10
	 * @hooked crypto_news_post_meta            - 20
	 * @hooked crypto_news_post_content         - 30
	 */
	do_action( 'crypto_news_loop_post' );
	?>

</article><!-- #post-## -->
