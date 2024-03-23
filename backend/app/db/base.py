from core.config import settings

from pymongo import MongoClient

class Database:
    __instance = None

    @staticmethod
    def get_instance():
        if Database.__instance is None:
            Database()
        return Database.__instance

    def __init__(self):
        if Database.__instance is not None:
            raise Exception("This class is a singleton!")
        else:
            Database.__instance = self
            self.client = MongoClient(settings.MONGO_DATABASE_URI)

            # Send a ping to confirm a successful connection
            try:
                self.client.admin.command('ping')
                print("Pinged your deployment. You successfully connected to MongoDB!")
            except Exception as e:
                print(e)

            self.db = self.client[settings.MONGO_DATABASE]
            self.users_collection = self.db['users']