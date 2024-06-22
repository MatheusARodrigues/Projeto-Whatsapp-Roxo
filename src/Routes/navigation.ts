import { ParametrosDaRota } from "./StackRoutes";

declare global {
    namespace ReactNavigation{
        interface RootParamList extends ParametrosDaRota {}
    }
}