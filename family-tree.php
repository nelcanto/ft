<?php 
/* 
Plugin Name: Family Tree
Description: Display and edit a Family Tree 
Version: 1.0 
Author: nytweb 
*/

function add_scripts()
{
    $viewTree = $_GET['view-family-tree'];

    if ($viewTree) {
        // HEADER STYLES
        wp_enqueue_style( 'family-tree', plugins_url('dist/css/main.css', __FILE__));
        wp_enqueue_style( 'jquery-ui', 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/themes/redmond/jquery-ui.css' );

        // FOOTER SCRIPTS
        wp_register_script('jquery-ui', 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.js', array('jquery'), null, true);
        wp_enqueue_script('jquery-ui');

        wp_register_script('bootstrap', 'https://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js', array(), null, true);
        wp_enqueue_script('bootstrap');

        wp_register_script('d3', 'https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.js', array(), null, true);
        wp_enqueue_script('d3');

        wp_register_script('traceur-runtime', plugins_url( 'bower_components/traceur-runtime/traceur-runtime.js', __FILE__), array(), null, true);
        wp_enqueue_script('traceur-runtime');

        wp_register_script('lodash', 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.12.0/lodash.js', array(), null, true);
        wp_enqueue_script('lodash');

        wp_register_script('node-modal', plugins_url( 'dist/scripts/NodeModal.js', __FILE__ ), array('jquery', 'bootstrap'), null, true);
        wp_enqueue_script('node-modal');

        wp_register_script('global-js', plugins_url( 'dist/scripts/global.js', __FILE__), array('jquery', 'node-modal'), null, true);
        wp_enqueue_script('global-js');

        wp_register_script('draw-tree', plugins_url( 'dist/scripts/drawTree.js', __FILE__ ), array('jquery', 'd3', 'global-js'), null, true);
        wp_enqueue_script('draw-tree');
    }
}
add_action( 'wp_enqueue_scripts', 'add_scripts', 9998 );

function show_family_tree() {
    //ob_start();
    //echo 'asdasd';
    include('tree.php');
    //ob_end_clean();
}

/* display the family tree before activity post form when family parameter is passed in request */
add_action( 'bp_before_member_activity_post_form', 'show_family_tree', 10 );

?>