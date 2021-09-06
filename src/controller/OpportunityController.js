import Opportunity from "../model/Opportunity.js";

export default {
    async indexOpportunity(req,res) {
        try {
            const opportunity = await Opportunity.find();

            return res.status(200).json({Opportunity: opportunity});
        }catch(error) {
            return res.status(400).json({Erro: error});
        }
    }
}