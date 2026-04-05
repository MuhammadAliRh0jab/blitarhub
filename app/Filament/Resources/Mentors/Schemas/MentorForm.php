<?php

namespace App\Filament\Resources\Mentors\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class MentorForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('user_id')
                    ->required()
                    ->numeric(),
                TextInput::make('company'),
                TextInput::make('expertise'),
                TextInput::make('linkedin_url')
                    ->url(),
            ]);
    }
}
