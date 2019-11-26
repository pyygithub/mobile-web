<template>
    <section class="msite">
        <!--首页头部-->
        <HeaderTop :title="address.name">
            <router-link class="header_search" slot="left" to="/search">
                <i class="iconfont icon-search"></i>
            </router-link>
            <router-link class="header_login" slot="right" :to="!username ? '/login' : '/profile'">
                <span class="header_login_text" v-if="!username">登录|注册</span>
                <span class="header_login_text" v-else>
                    <i class="iconfont icon-user-circle"></i>
                </span>
            </router-link>
        </HeaderTop>
        <!--首页导航-->
        <nav class="msite_nav">
            <div class="swiper-container" v-if="foodTypesArr.length">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(typesArr, index) in foodTypesArr" :key="index">
                        <a href="javascript:" class="link_to_food" v-for="(type, index) in typesArr" :key="index">
                            <div class="food_container">
                                <img :src="baseImageUrl + type.image_url">
                            </div>
                            <span>{{type.title}}</span>
                        </a>
                    </div>
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>
            <img src="./images/msite_back.svg" alt="back" v-else/>
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
            <div class="shop_header">
                <i class="iconfont icon-xuanxiang"></i>
                <span class="shop_header_title">附近商家</span>
            </div>

            <!-- 商家列表 -->
            <ShopList></ShopList>
        </div>
    </section>
</template>

<script>
    import Swiper from 'swiper'
    import 'swiper/css/swiper.min.css'
    import HeaderTop from '../../components/HeaderTop/HeaderTop'
    import ShopList from '../../components/ShopList/ShopList'
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                baseImageUrl: 'https://fuss10.elemecdn.com'
            }
        },
        mounted() {
            this.$store.dispatch('getFoodTypes')
            this.$store.dispatch('getShopList')
        },
        computed: {
            ...mapGetters(['address', 'foodTypes', 'username']),

            foodTypesArr () {
                // 准备空的2维数组
                const arr = []
                //准备一个小数组（最大长度为8）
                let minArr = []
                this.foodTypes.forEach(type => {
                    // 如果当前小数组已经满了，创建一个新的
                    if (minArr.length === 8) {
                        minArr = []
                    }
                    // 如果当前小数组为空，将小数组保存到二维数组中
                    if (minArr.length === 0) {
                        arr.push(minArr)
                    }
                    // 将当前类型放入小数组
                    minArr.push(type)
                })
                return arr
            }
        },
        watch: {
            foodTypes () {
                // 一旦页面更新，立即调用（此条预计必须写在数据更新之后）
                this.$nextTick(() => {
                    // 必须有数据才能执行这段逻辑
                    new Swiper('.swiper-container', {
                        loop: true,
                        pagination: {
                            el: '.swiper-pagination'
                        }
                    })
                })

            }
        },
        components: {
            HeaderTop,
            ShopList
        }
    }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
    @import "../../assets/stylus/mixins.styl"
    .msite //首页
        width 100%
        .header_search
            position absolute
            left 15px
            top 50%
            transform translateY(-50%)
            width 10%
            height 50%
            .icon-search
                font-size 25px
                color #fff
        .header_login
            font-size 14px
            color #fff
            position absolute
            right 15px
            top 50%
            transform translateY(-50%)
            .header_login_text
                color #fff
        .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
                width 100%
                height 100%
                .swiper-wrapper
                    width 100%
                    height 100%
                    .swiper-slide
                        display flex
                        justify-content center
                        align-items flex-start
                        flex-wrap wrap
                        .link_to_food
                            width 25%
                            .food_container
                                display block
                                width 100%
                                text-align center
                                padding-bottom 10px
                                font-size 0
                                img
                                    display inline-block
                                    width 50px
                                    height 50px
                            span
                                display block
                                width 100%
                                text-align center
                                font-size 13px
                                color #666
                .swiper-pagination
                    > span.swiper-pagination-bullet-active
                        background #02a774
        .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
                padding 10px 10px 0
                .shop_icon
                    margin-left 5px
                    color #999
                .shop_header_title
                    color #999
                    font-size 14px
                    line-height 20px

</style>
