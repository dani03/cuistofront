<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <header>
        <div class="wrapper">
            <nav>
                <RouterLink to="/">Acceuil</RouterLink>
            </nav>
        </div>
    </header>

    <RouterView />
</template>
