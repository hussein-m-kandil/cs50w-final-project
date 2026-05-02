from django.core.management.base import BaseCommand
from faker import Faker

from provetrina.accounts.models import User
from provetrina.profiles import models as profile_models


class Command(BaseCommand):
    help = 'Seeds the provetrina app with dummy profiles.'

    def handle(self, *args, **options):
        self.stdout.write(
            self.style.NOTICE('Seeding Provetrina with some profiles...')
        )
        fake = Faker()
        profile_count = 100
        for _ in range(profile_count):
            first_name = fake.unique.first_name()
            last_name = fake.unique.last_name()
            username = f'{first_name}_{last_name}'
            name = f'{first_name} {last_name}'
            email = f'{username}@example.ex'
            user = User.objects.create_user(username, email, fake.password())
            profile_models.Profile.objects.create(
                owner=user,
                name=name,
                email=email,
                title=fake.job(),
                location=fake.street_address(),
                tel=fake.unique.phone_number(),
            )
        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully seeded Provetrina with {profile_count} profiles.'
            )
        )
