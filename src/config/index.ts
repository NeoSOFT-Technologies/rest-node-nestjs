import app from '@app/config/app';
import auth from '@app/config/authentication';
import crypto from '@app/config/crypto';
import db from '@app/config/database';
import services from '@app/config/services';
import settings from '@app/config/settings';

import mailer from './mailer';

export default [app, db, crypto, settings, services, mailer, auth];
