import React from "react";
import styles from "./CardsPage.module.css";
import CardItem from "./card-item/CardItem";
import {
    closeCreateCardModal,
    createCard,
    fetchCards,
    openCreateCardModal,
    openTopUpModal
} from "../../redux/reducers/cardsReducer";
import {connect} from "react-redux";
import CreateCardModal from "./CreateCardModal";
import TopUpModal from "./TopUpModal";

class CardsPage extends React.Component {
    componentDidMount() {
        this.props.fetchCards();
        this.timer=setInterval(()=>this.props.fetchCards(),60000);
    }

    render() {
        return (
            <div>
                <div>
                    <button type="button" className={`${styles.button} btn btn-success`} onClick={this.props.openCreateCardModal}>+ Add card</button>
                </div>
                <div className={`${styles.content} d-flex flex-column align-items-center`}>
                {
                    this.props.cards
                        .map((card) => (
                            <div className={`${styles.content__card}`}>
                                <CardItem onTopUpClick={(cardId) => this.props.openTopUpModal(cardId)} card={card}/>
                            </div>
                        ))
                }
                </div>

                <CreateCardModal/>
                <TopUpModal/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        cards:state.cardsReducer.cards
    }
}

function mapDispatchToProps(dispatch){
    return{
        fetchCards:()=>dispatch(fetchCards()),
        createCard:()=>dispatch(createCard()),
        openCreateCardModal:()=>dispatch(openCreateCardModal()),
        openTopUpModal:(cardId)=>dispatch(openTopUpModal(cardId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CardsPage);