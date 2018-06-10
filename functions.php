<?php
function remove_scripts() {
    // Removes the parent themes stylesheet and scripts from inc/enqueue.php

    //wp_dequeue_style( '' );
    //wp_deregister_style( '' );

    //wp_dequeue_script( '' );
    //wp_deregister_script( '' );

}
add_action( 'wp_enqueue_scripts', 'remove_scripts', 20 );


function theme_enqueue_styles() {
    // Get the theme data
    $the_theme = wp_get_theme();
    wp_enqueue_script( 'child-scripts', get_stylesheet_directory_uri() . '/assets/js/common.min.js', array('snow-monkey'), $the_theme->get( 'Version' ), true );
    //wp_enqueue_style( 'child-styles', get_stylesheet_directory_uri() . '/assets/css/style.css', array('snow-monkey'), $the_theme->get( 'Version' ) );
}
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );


