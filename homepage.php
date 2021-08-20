<?php
/**
 * Template name: homepage
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package oa
 */

get_header();
?>

	<section class="featured">
        <div class="grid-container full">
            <?php if( have_rows('body_section') ): ?>
            <?php while( have_rows('body_section') ): the_row(); ?>

                <?php if( get_row_layout() == 'featured_post' ): ?>
                    <div class="grid-x">
                        <div class="cell medium-6 large-7">
                            <img loading="lazy" src="<?php the_sub_field('featured_post_image'); ?>" />
                        </div>
                        <div class="cell medium-6 large-5 content">
                            <h2><?php the_sub_field("featured_post_heading"); ?></h2>
                            <p><?php the_sub_field("featured_post_content"); ?></p>
                        </div>
                    </div>
                    
                    

                <?php endif; ?>

            <?php endwhile; ?>
            <?php endif; ?>
        </div>



	</section><!-- #main -->




<?php
//get_sidebar();
get_footer();
