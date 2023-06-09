import { rankItem, rankings } from "@tanstack/match-sorter-utils";
import type { RankingInfo } from "@tanstack/match-sorter-utils";
import type { Row } from "@tanstack/react-table";

//? Record<keys,types> - jest to konstrukt ktory jako pierwsza wartosc przyjmuje klucze obiektu a druga wartosc to typy, ktore moga zostac zmapowane do innych typow

//! Filter fns

const fuzzy = <TData extends Record<string, any> = {}>(
    row: Row<TData>,
    columnId: string,
    filterValue: string | number,
    addMeta: (item: RankingInfo) => void
) => {
    const itemRank = rankItem(row.getValue(columnId), filterValue as string, {
        threshold: rankings.MATCHES,
    });
    addMeta(itemRank);

    return itemRank.passed;
};
//? Tutaj jezeli wartosc jest falszywa to zostanie usuwana z tablicy
fuzzy.autoRemove = (val: any) => !val;

const contains = <TData extends Record<string, any>>(row: Row<TData>, id: string, filterValue: string | number) =>
    row.getValue<string | number>(id).toString().toLowerCase().trim().includes(filterValue.toString().toLowerCase().trim());

contains.autoRemove = (val: any) => !val;

const startsWith = <TData extends Record<string, any>>(row: Row<TData>, id: string, filterValue: string | number) =>
    row.getValue<string | number>(id).toString().toLowerCase().trim().startsWith(filterValue.toString().toLowerCase().trim());

startsWith.autoRemove = (val: any) => !val;

export const filterFns = {
    fuzzy,
    contains,
    startsWith,
};
