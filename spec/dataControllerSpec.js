import * as dataController from '../js/data-controller';
import { networkInterfaces } from 'os';

describe("Data controller", () => {

    it("should be able to add a new item", () => {
        const goalName = 'Read a book per a week';

        dataController.setDefaultSettings();
        const newItem = dataController.addItem(goalName);
        expect(dataController.getItems()[0]).toBe(newItem);
    });

    it("should be able to delete a item", () => {
        dataController.setDefaultSettings();

        const goalName = 'Read a book per a week';
        const newItem = dataController.addItem(goalName);
        expect(dataController.getItems().length).toBe(1);

        dataController.deleteItem(newItem.id);
        expect(dataController.getItems().length).toBe(0);
    });

    it("should be able to complete item", () => {
        dataController.setDefaultSettings();

        const goalName = 'Read a book per a week';
        const newItem = dataController.addItem(goalName);
        expect(newItem.status).toBe(false);

        dataController.completeItem(newItem.id);
        expect(newItem.status).toBe(true);
    });

    it("should be able to calc item status", () => {
        dataController.setDefaultSettings();

        const goalName = 'Read a book per a week';
        const newItem = dataController.addItem(goalName);
        dataController.calcItemProgress(newItem.id);
        expect(newItem.progress).toBe(0);

        dataController.completeItem(newItem.id);
        dataController.calcItemProgress(newItem.id)
        expect(newItem.progress).toBe(100);
    });
});