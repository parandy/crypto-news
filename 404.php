<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @package Crypto_News
 */

get_header(); ?>

	<div id="primary" class="content-area">

		<main id="main" class="site-main" role="main">

			<div class="error-404 not-found">

				<div class="page-content">

					<header class="page-header">
						<h1 class="page-title"><?php esc_html_e( 'Oops! That page can&rsquo;t be found.', 'crypto-news' ); ?></h1>
					</header><!-- .page-header -->

					<p><?php esc_html_e( 'Nothing was found at this location. Try searching, or check out the links below.', 'crypto-news' ); ?></p>

					<?php
					echo '<section aria-label="' . esc_attr__( 'Search', 'crypto-news' ) . '">';

				
					get_search_form();
					

					echo '</section>';

					
					?>

				</div><!-- .page-content -->
			</div><!-- .error-404 -->

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer();
