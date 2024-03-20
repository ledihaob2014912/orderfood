<template>
    <div class="menu-section">
        <div class="heading">
            <span>menu</span>
            <h3>our special dishes</h3>
        </div>

        <div class="row">
            <div class="col-sm-4 col-12 filter-box">
                <div class="row search-box">
                    <input type="text" class="search-input" v-model="foodObj.name" placeholder="Search.." />
                </div>

            </div>

            <div class="col-sm-8">
                

                <div class="row box-container">
                    <div v-for="(f, index) in currentPageItems" :key="index">
                        <div class="box">
                            <a href="" class="fas fa-heart"></a>
                            <div class="image">
                                <img :src="require(`../assets/images/${f.food_src}`)" alt="" />
                            </div>
                            <div class="content">
                                <h3>{{ f.food_name }}</h3>
                                <div class="stars">
                                    <div v-for="s in Math.floor(parseFloat(f.food_star))" :key="s" class="d-inline">
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <div v-if="parseFloat(f.food_star) - Math.floor(parseFloat(f.food_star)) == 0.5"
                                        class="d-inline">
                                        <i class="fas fa-star-half-alt"></i>
                                    </div>
                                    <span> ({{ f.food_vote }}) </span>
                                </div>
                                <div class="desc">
                                    <p>{{ f.food_desc }}</p>
                                </div>
                                <div class="price">
                                    ${{ parseFloat(f.food_price) - parseFloat(f.food_discount) }}
                                    <span v-if="parseFloat(f.food_discount) != 0.00">${{ parseFloat(f.food_price)
                                    }}</span>
                                </div>
                                <button class="btn" @click="addItem(index)">Add to cart</button>
                            </div>
                        </div>
                    </div>
                    <div v-if="!filterFoods.length">
                        <div class="box">
                            <div class="content">
                                <h1 style="color: #057835fa;">No match found!</h1>
                            </div>
                            <div class="image">
                                <img src="../assets/images/notfound.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="calculatePages > 1" class="action-row">

                    <button v-if="pageNum != 0" @click="previous()" class="action-btn"> {{ "<" }} </button>
                            <div v-for="(p, i) in calculatePages" :key="i" class="d-inline">
                                <span v-if="i == pageNum" class="highlight" @click="set(i)">{{ i + 1 }}</span>
                                <span v-else @click="set(i)">{{ i + 1 }}</span>
                            </div>
                            <button v-if="pageNum != calculatePages - 1" @click="next()" class="action-btn"> {{ ">" }}
                            </button>
                </div>
            </div>
        </div>

        
    </div>
</template>

<script>

import { mapState } from "vuex";
export default {
    name: "Menu",

    data() {
        return {
            foodObj: { name: "", category: "", status: [], price: "", type: "" },
            showDropDown: false,
            sendId: null,
            perPage: 6,
            pageNum: 0,
            
        };
    },

    computed: {
        ...mapState(["allFoods"]),

        filterFoods: function () {
            return this.allFoods.filter((f) => f.food_name.toLowerCase().match(this.foodObj.name.toLowerCase()) &&
                (f.food_category.match(this.foodObj.category) || this.foodObj.category == "all" || this.foodObj.category == "") &&
                (this.evaluatePrice(f, this.foodObj.price)) &&
                f.food_type.toLowerCase().match(this.foodObj.type.toLowerCase()) &&
                (this.evaluateStatus(f, this.foodObj.status)));
        },
        currentPageItems: function () {
            return this.filterFoods.slice(this.pageNum * this.perPage, this.pageNum * this.perPage + this.perPage);
        },
        calculatePages: function () {
            if (this.filterFoods.length % this.perPage != 0) {
                return Math.floor((this.filterFoods.length) / this.perPage) + 1;
            }
            else {
                return this.filterFoods.length / this.perPage;
            }
        }
    },
    methods: {
        set(val) {
            this.pageNum = val;
        },
        next() {
            this.pageNum++;
        },
        previous() {
            this.pageNum--;
        },
        evaluateStatus: function (food, statusArray) {
            this.pageNum = 0;
            if (statusArray.length != 0) {
                if (this.checkSale(food, statusArray) && this.checkBest(food, statusArray) && this.checkNew(food, statusArray) && this.checkSeason(food, statusArray) && this.checkOnl(food, statusArray)) {
                    return food;
                }
            }
            else {
                return food;
            }
        },
        evaluatePrice: function (food, priceRange) {
            this.pageNum = 0;
            var cal = parseFloat(food.food_price) - parseFloat(food.food_discount);
            if (priceRange == "2,5") {
                if (2 <= cal && cal <= 5) {
                    return food;
                }
            }
            else if (priceRange == "5,10") {
                if (5 <= cal && cal <= 10) {
                    return food;
                }
            }
            else if (priceRange == "10,12") {
                if (10 <= cal && cal <= 12) {
                    return food;
                }
            }
            else if (priceRange == "2") {
                if (cal <= 2) {
                    return food;
                }
            }
            else if (priceRange == "12") {
                if (cal >= 12) {
                    return food;
                }
            }
            else if (priceRange == "") {
                return food;
            }
        },

    },
    
};
        
     
</script>

<style scoped>
input[type="button"] {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
}

.unselect-btn:active,
.unselect-btn:focus,
.action-btn:active,
.action-btn:focus {
    border: none;
    outline: none;
}

hr {
    border-top: 3px solid #057835fa;
    width: 100%;
}

.search-box {
    width: 100%;
    justify-content: center;
    position: relative;
    display: flex;
}

.search-input {
    margin: 0;
    width: 100%;
    height: 40px;
    font-size: 20px;
    color: white;
    background: #27ae60;
}

::placeholder {
    color: white;
}

.menu-section {
    padding: 2rem 9%;
}

.menu-section .menu-tabs {
    margin-bottom: 30px;
    flex: 0 0 100%;
    max-width: 100%;
    text-align: center;
    background-color: #27ae60;
}

.menu-section .menu-tabs .menu-tab-item {
    display: inline-block;
    cursor: pointer;
    padding: 5px 30px;
    border-radius: 30%;
    font-size: 20px;
    color: whitesmoke;
    font-weight: 500;
    text-transform: capitalize;
    transition: all 0.3s ease;
    margin: 0;
}

.menu-section .menu-tabs .menu-tab-item:hover {
    background-color: #f38609 !important;
}

.menu-section .menu-tabs .menu-tab-item p {
    padding: none;
    margin: none;
}

.menu-section .box-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    gap: 1.5rem;
}

.menu-section .box-container .box {
    border-radius: 0.5rem;
    position: relative;
    background: #f7f7f7;
    padding: 2rem;
    text-align: center;
}

.menu-section .box-container .box .fa-heart {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    font-size: 2.5rem;
    color: #666;
    cursor: pointer;
}

.menu-section .box-container .box .fa-heart:hover {
    color: #27ae60;
}

.menu-section .box-container .box .image {
    margin: 1rem 0;
}

.menu-section .box-container .box .image img {
    height: 15rem;
}

.menu-section .box-container .box .content h3 {
    font-size: 2rem;
    color: #130f40;
}

.menu-section .box-container .box .content .stars {
    padding: 1rem 0;
    font-size: 1.7rem;
}

.menu-section .box-container .box .content .stars i {
    color: gold;
}

.menu-section .box-container .box .content .stars span {
    color: #666;
}

.menu-section .box-container .box .content .desc p {
    font-size: 14px;
    margin: 0;
}

.menu-section .box-container .box .content .price {
    font-size: 2rem;
    color: #130f40;
}

.menu-section .box-container .box .content .price span {
    font-size: 1.5rem;
    color: #666;
    text-decoration: line-through;
}

@media (max-width: 768px) {
    .menu-section .box-container {

        grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
        gap: 1rem;
    }

    .menu-section .box-container .box .content h3 {
        height: 4rem;
    }
}

@media (max-width: 576px) {

    .search-box,
    

    .menu-tabs .menu-tab-item {
        font-size: 12px !important;
        padding: 5px 20px !important;
    }

    .menu-section .action-row {
        font-size: 16px !important;
    }

    .menu-section .action-row span {
        margin-right: 5px;
    }

    .menu-section .box-container .box .image img {
        height: 10rem;
    }

    .menu-section .box-container .box .desc p,
    .menu-section .box-container .box .content .stars {
        font-size: 10px !important;
    }

    .menu-section .box-container .box .content h3 {
        font-size: 14px !important;
        height: 28px;
    }
}
</style>


