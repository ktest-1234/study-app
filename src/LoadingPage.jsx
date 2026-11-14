import { MutatingDots } from "react-loader-spinner";

export default function LoadingPage(){
    return <div className="grid min-h-screen place-items-center">
        <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#226be0"
            secondaryColor="#528dfa"
            radius="20"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""/>
        <h4>Please wait, we are trying to connect you to the server.... Thank you.</h4>
    </div>
}